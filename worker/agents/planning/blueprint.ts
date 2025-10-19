import { TemplateDetails, TemplateFileSchema } from '../../services/sandbox/sandboxTypes'; // Import the type
import { STRATEGIES, PROMPT_UTILS, generalSystemPromptBuilder } from '../prompts';
import { executeInference } from '../inferutils/infer';
import { Blueprint, BlueprintSchema, TemplateSelection } from '../schemas';
import { createLogger } from '../../logger';
import { createSystemMessage, createUserMessage, createMultiModalUserMessage } from '../inferutils/common';
import { InferenceContext } from '../inferutils/config.types';
import { TemplateRegistry } from '../inferutils/schemaFormatters';
import z from 'zod';
import { imagesToBase64 } from 'worker/utils/images';
import { ProcessedImageAttachment } from 'worker/types/image-attachment';
import { SYSTEM_PROMPT } from './prompts/architect';

const logger = createLogger('Blueprint');

export interface BlueprintGenerationArgs {
    env: Env;
    inferenceContext: InferenceContext;
    query: string;
    language: string;
    frameworks: string[];
    // Add optional template info
    templateDetails: TemplateDetails;
    templateMetaInfo: TemplateSelection;
    images?: ProcessedImageAttachment[];
    stream?: {
        chunk_size: number;
        onChunk: (chunk: string) => void;
    };
}

/**
 * Generate a blueprint for the application based on user prompt
 */
// Update function signature and system prompt
export async function generateBlueprint({ env, inferenceContext, query, language, frameworks, templateDetails, templateMetaInfo, images, stream }: BlueprintGenerationArgs): Promise<Blueprint> {
    try {
        logger.info("Generating application blueprint", { query, queryLength: query.length, imagesCount: images?.length || 0 });
        logger.info(templateDetails ? `Using template: ${templateDetails.name}` : "Not using a template.");

        // ---------------------------------------------------------------------------
        // Build the SYSTEM prompt for blueprint generation
        // ---------------------------------------------------------------------------

        const filesText = TemplateRegistry.markdown.serialize(
            { files: templateDetails.files.filter(f => !f.filePath.includes('package.json')) },
            z.object({ files: z.array(TemplateFileSchema) })
        );

        const fileTreeText = PROMPT_UTILS.serializeTreeNodes(templateDetails.fileTree);
        const systemPrompt = SYSTEM_PROMPT.replace('{{filesText}}', filesText).replace('{{fileTreeText}}', fileTreeText);
        const systemPromptMessage = createSystemMessage(generalSystemPromptBuilder(systemPrompt, {
            query,
            templateDetails,
            frameworks,
            templateMetaInfo,
            blueprint: undefined,
            language,
            dependencies: templateDetails.deps,
        }));

        const userMessage = images && images.length > 0
            ? createMultiModalUserMessage(
                `CLIENT REQUEST: "${query}"`,
                await imagesToBase64(env, images), 
                'high'
              )
            : createUserMessage(`CLIENT REQUEST: "${query}"`);

        const messages = [
            systemPromptMessage,
            userMessage
        ];

        // Log messages to console for debugging
        // logger.info('Blueprint messages:', JSON.stringify(messages, null, 2));
        
        // let reasoningEffort: "high" | "medium" | "low" | undefined = "medium" as const;
        // if (templateMetaInfo?.complexity === 'simple' || templateMetaInfo?.complexity === 'moderate') {
        //     console.log(`Using medium reasoning for simple/moderate queries`);
        //     modelName = AIModels.OPENAI_O4_MINI;
        //     reasoningEffort = undefined;
        // }

        const { object: results } = await executeInference({
            env,
            messages,
            agentActionName: "blueprint",
            schema: BlueprintSchema,
            context: inferenceContext,
            stream: stream,
        });

        if (results) {
            // Filter and remove any pdf files
            results.initialPhase.files = results.initialPhase.files.filter(f => !f.path.endsWith('.pdf'));
        }

        // // A hack
        // if (results?.initialPhase) {
        //     results.initialPhase.lastPhase = false;
        // }
        return results as Blueprint;
    } catch (error) {
        logger.error("Error generating blueprint:", error);
        throw error;
    }
}
