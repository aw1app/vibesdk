import { ROLE } from './01_role';
import { GOAL } from './02_goal';
import { INSTRUCTIONS } from './03_instructions';
import { KEY_GUIDELINES } from './04_key_guidelines';
import { STRATEGY_AND_TEMPLATE } from './05_strategy_and_template';

export const SYSTEM_PROMPT = `
${ROLE}
${GOAL}
${INSTRUCTIONS}
${KEY_GUIDELINES}
${STRATEGY_AND_TEMPLATE}
`;
