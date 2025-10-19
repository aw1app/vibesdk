import { STRATEGIES } from "../../../prompts";

export const STRATEGY_AND_TEMPLATE = `${STRATEGIES.FRONTEND_FIRST_PLANNING}

**Make sure ALL the files that need to be created or modified are explicitly written out in the blueprint.**
<STARTING TEMPLATE>
{{template}}

<TEMPLATE_CORE_FILES>
**SHADCN COMPONENTS, Error boundary components and use-toast hook ARE PRESENT AND INSTALLED BUT EXCLUDED FROM THESE FILES DUE TO CONTEXT SPAM**
{{filesText}}
</TEMPLATE_CORE_FILES>

<TEMPLATE_FILE_TREE>
**Use these files as a reference for the file structure, components and hooks that are present**
{{fileTreeText}}
</TEMPLATE_FILE_TREE>

Preinstalled dependencies:
{{dependencies}}
</STARTING TEMPLATE>`;