import { PROMPT_UTILS } from "../../../prompts";

export const INSTRUCTIONS = `<INSTRUCTIONS>
    ## Design System & Aesthetics
    • **Color Palette & Visual Identity:** Choose a sophisticated, modern color palette that creates visual hierarchy and emotional connection. Specify primary, secondary, accent, neutral, and semantic colors (success, warning, error) with exact usage guidelines. Consider color psychology and brand personality.
    • **Typography System:** Design a comprehensive typography scale with clear hierarchy - headings (h1-h6), body text, captions, labels. Specify font weights, line heights, letter spacing. Use system fonts or web-safe fonts for performance. Plan for readability and visual appeal.
    • **Spacing & Layout System:** All layout spacing (margins, padding, gaps) MUST use Tailwind's spacing scale (4px increments). Plan consistent spacing patterns - component internal spacing, section gaps, page margins. Create visual rhythm and breathing room.
    • **Component Design System:** Design beautiful, consistent UI components with:
        - **Interactive States:** hover, focus, active, disabled states for all interactive elements
        - **Loading States:** skeleton loaders, spinners, progress indicators
        - **Feedback Systems:** success/error messages, tooltips, notifications
        - **Micro-interactions:** smooth transitions, subtle animations, state changes
    • **The tailwind.config.js and css styles provided are foundational. Extend thoughtfully:**
        - **Preserve all existing classes in tailwind.config.js** - extend by adding new ones alongside existing definitions
        - Ensure generous margins and padding around the entire application
        - Plan for proper content containers and max-widths
        - Design beautiful spacing that works across all screen sizes
    • **Layout Excellence:** Design layouts that are both beautiful and functional:
        - Clear visual hierarchy and information architecture
        - Generous white space and breathing room
        - Balanced proportions and golden ratio principles
        - Mobile-first responsive design that scales beautifully
    ** Lay these visual design instructions out explicitly throughout the blueprint **

    ${PROMPT_UTILS.UI_GUIDELINES}

    ## Frameworks & Dependencies
    • Choose an exhaustive set of well-known libraries, components and dependencies that can be used to build the application with as little effort as possible.
        - **Select libraries that work out-of-the-box** without requiring API keys or environment variable configuration
        - Provide an exhaustive list of libraries, components and dependencies that can help in development so that the devs have all the tools they would ever need.
        - Focus on including libraries with batteries included so that the devs have to do as little as possible.

    • **Keep simple applications simple:** For single-view or static applications, implement in 1-2 files maximum with minimal abstraction.
    • **VISUAL EXCELLENCE MANDATE:** The application MUST appear absolutely stunning - visually striking, professionally crafted, meticulously polished, and best-in-class. Users should be impressed by the visual quality and attention to detail.
    • **ITERATIVE BEAUTY:** The application would be iteratively built in multiple phases, with each phase elevating the visual appeal. Plan the initial phase to establish strong visual foundations and impressive first impressions.
    • **RESPONSIVE DESIGN MASTERY:** The UI should be flawlessly responsive across all devices with beautiful layouts on mobile, tablet and desktop. Each breakpoint should feel intentionally designed, not just scaled. Keyboard/mouse interactions are primary focus.
    • **PERFORMANCE WITH BEAUTY:** The application should be lightning-fast AND visually stunning. Plan for smooth animations, optimized images, fast loading states, and polished micro-interactions that enhance rather than hinder performance.
    • **TEMPLATE ENHANCEMENT:** Build upon the <STARTING TEMPLATE> while significantly elevating its visual appeal. Suggest additional UI/animation libraries, icon sets, and design-focused dependencies in the \`frameworks\` section.
        - Enhance existing project patterns with beautiful visual treatments
        - Add sophisticated styling and interaction libraries as needed

    ## Important use case specific instructions:
    {{usecaseSpecificInstructions}}

    ## Algorithm & Logic Specification (for complex applications):
    • **Game Logic Requirements:** For games, specify exact rules, win/lose conditions, scoring systems, and state transitions. Detail how user inputs map to game actions.
    • **Mathematical Operations:** For calculation-heavy apps, specify formulas, edge cases, and expected behaviors with examples.
    • **Data Transformations:** Detail how data flows between components, what transformations occur, and expected input/output formats.
    • **Critical Algorithm Details:** For complex logic (like 2048), specify: grid structure, tile movement rules, merge conditions, collision detection, positioning calculations.
    • **Example-Based Logic Clarification:** For the most critical function (e.g., a game move), you MUST provide a simple, concrete before-and-after example.
        - **Example for 2048 \`moveLeft\` logic:** "A 'left' move on the row \`[2, 2, 4, 0]\` should result in the new row \`[4, 4, 0, 0]\`. Note that the two '2's merge into a '4', and the existing '4' slides next to it."
        - This provides a clear, verifiable test case for the core algorithm.
    • **Domain relevant pitfalls:** Provide concise, single line domain specific and relevant pitfalls so the coder can avoid them. Avoid giving generic advice that has already also been provided to you (because that would be provided to them too).

    **Visual Assets - Use These Approaches:**
    ✅ External image URLs: Use unsplash.com or placehold.co for images
    ✅ Canvas drawings: \`<canvas>\` element for shapes, patterns, charts
    ✅ Simple SVG inline: \`<svg><circle cx="50" cy="50" r="40" fill="blue" /></svg>\`
    ✅ Icon libraries: lucide-react, heroicons (specify in frameworks)
    ❌ Never: .png, .jpg, .svg, .gif files in phase files list
    Binary files cannot be generated. Always use the approaches above for visual content.
</INSTRUCTIONS>`;
