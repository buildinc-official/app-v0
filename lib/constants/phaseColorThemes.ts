/**
 * Create project: phases use neutral chrome; tasks use blue accents (app theme).
 */

export type SectionTheme = {
	card: string;
	cardHover: string;
	icon: string;
	iconHover: string;
	chip: string;
	drag: string;
	headerStrip: string;
	contentTint: string;
	primaryAction: string;
	outlineIcon: string;
	browseTemplates: string;
};

/** Phases / templates — neutral surfaces; blue only on primary CTAs (Add phase, etc.) */
export const PHASE_SECTION_THEME: SectionTheme = {
	card: "border-border/70 bg-card/98 ring-border/30",
	cardHover:
		"hover:border-border/90 hover:bg-muted/30 hover:shadow-sm hover:ring-border/40",
	icon: "bg-muted text-foreground ring-border/60",
	iconHover: "group-hover:bg-muted/80 group-hover:ring-border",
	chip: "bg-slate-100/90 text-slate-600 ring-1 ring-slate-200/70 dark:bg-slate-800/45 dark:text-slate-300 dark:ring-slate-600/35",
	drag: "ring-2 ring-border/80 dark:ring-border",
	headerStrip: "border-b border-border bg-muted/30",
	contentTint: "bg-muted/15 dark:bg-muted/20",
	primaryAction:
		"border border-blue-600/40 bg-blue-600 text-white shadow-sm hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500",
	outlineIcon:
		"border-border bg-background/90 text-foreground hover:bg-muted/60",
	browseTemplates:
		"border-blue-500/25 bg-blue-500/[0.04] text-foreground shadow-sm ring-1 ring-blue-500/15 hover:border-blue-500/40 hover:bg-blue-500/[0.08] hover:shadow-md dark:bg-blue-950/20",
};

/** Tasks — light blue fill (light); deeper slate + muted text (dark) */
export const TASK_SECTION_THEME: SectionTheme = {
	card: "border-border/55 bg-blue-50 shadow-sm ring-0 dark:border-slate-800 dark:bg-slate-950 dark:shadow-md dark:ring-1 dark:ring-slate-800/80",
	cardHover:
		"hover:border-border hover:bg-blue-100 hover:shadow-md dark:hover:border-slate-700 dark:hover:bg-slate-900 dark:hover:ring-slate-700/60",
	icon: "bg-blue-100 text-blue-900 ring-1 ring-blue-200/40 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700/60",
	iconHover:
		"group-hover:bg-sky-100 group-hover:ring-sky-300/45 dark:group-hover:bg-slate-800 dark:group-hover:ring-slate-600/50",
	chip: "bg-blue-100 text-blue-900 ring-1 ring-blue-200/35 dark:bg-slate-900/95 dark:text-slate-300 dark:ring-slate-700/50",
	drag: "ring-2 ring-blue-200/45 dark:ring-slate-600/50",
	headerStrip:
		"border-b border-border/40 bg-blue-100/90 dark:border-slate-800 dark:bg-slate-900/90",
	contentTint: "bg-blue-50 dark:bg-slate-950",
	primaryAction:
		"border border-blue-800/45 bg-blue-800 text-white shadow-sm ring-1 ring-blue-900/25 hover:bg-blue-900 dark:border-blue-800/50 dark:bg-blue-900 dark:ring-blue-950/40 dark:hover:bg-blue-800",
	outlineIcon:
		"border-border/60 bg-background text-blue-900 hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 dark:hover:text-white",
	browseTemplates:
		"border-border/50 bg-blue-50 text-foreground shadow-sm ring-1 ring-border/30 hover:border-border hover:bg-blue-100 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:ring-slate-800/60 dark:hover:bg-slate-900",
};

export function getPhaseSectionTheme(): SectionTheme {
	return PHASE_SECTION_THEME;
}

export function getTaskSectionTheme(): SectionTheme {
	return TASK_SECTION_THEME;
}

/**
 * Lucide icons on template chips: do not use `text-inherit` — outline Buttons use
 * `text-foreground` (light in dark mode), and SVG inherits that instead of the chip.
 */
export const TEMPLATE_MODAL_ICON_GLYPH =
	"!text-black !stroke-black dark:!text-black dark:!stroke-black";

/** Template modal library cards + selected template — sky (distinct from task/slate) */
export const TEMPLATE_MODAL_THEME: SectionTheme = {
	card: "border-sky-200/80 bg-sky-50/95 shadow-sm ring-1 ring-sky-100/50 dark:border-sky-800/55 dark:bg-sky-950/70 dark:shadow-md dark:ring-sky-900/35",
	cardHover:
		"hover:border-sky-300 hover:bg-sky-100 hover:shadow-md dark:hover:border-sky-700 dark:hover:bg-sky-950/90",
	icon: "bg-blue-100 text-black ring-1 ring-blue-300/45 dark:bg-sky-500 dark:text-black dark:ring-sky-600/50",
	iconHover:
		"group-hover:bg-blue-200 group-hover:text-black group-hover:ring-blue-400/50 dark:group-hover:bg-sky-400 dark:group-hover:text-black dark:group-hover:ring-sky-500/55",
	chip: "bg-sky-100 text-sky-950 ring-1 ring-sky-300/40 dark:bg-sky-900/80 dark:text-sky-200 dark:ring-sky-800/45",
	drag: "ring-2 ring-sky-200/50 dark:ring-sky-700/35",
	headerStrip:
		"border-b border-sky-200/50 bg-sky-100/85 dark:border-sky-800/50 dark:bg-sky-950/55",
	contentTint: "bg-sky-50/60 dark:bg-sky-950/35",
	primaryAction:
		"border border-sky-600/40 bg-sky-600 text-white shadow-sm hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500",
	outlineIcon:
		"border-sky-300/60 bg-background text-sky-900 hover:bg-sky-50 dark:border-sky-700 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-900/70",
	browseTemplates:
		"border-sky-400/35 bg-sky-500/[0.07] text-foreground shadow-sm ring-1 ring-sky-400/20 hover:border-sky-400/55 hover:bg-sky-100/90 dark:border-sky-700/45 dark:bg-sky-950/50 dark:ring-sky-900/30 dark:hover:bg-sky-900/55",
};

export function getTemplateModalTheme(): SectionTheme {
	return TEMPLATE_MODAL_THEME;
}

/** Collapsible task header row — tab strip (create-project tasks step, step 3) */
export const TASK_TAB_ROW_CLASS =
	"rounded-md border-0 bg-blue-100 px-2 py-2.5 shadow-none sm:px-3 hover:bg-sky-100/95 dark:bg-blue-950 dark:text-white dark:shadow-sm dark:hover:bg-blue-900/55";

/** Expanded task body (dropdown) — darker than the task card in dark mode */
export const TASK_EXPANDED_PANEL_CLASS =
	"mt-5 space-y-5 border-t border-border/50 pt-5 dark:mt-4 dark:rounded-lg dark:border dark:border-zinc-800 dark:bg-black dark:p-4 dark:pt-5 sm:dark:p-5";

/** @deprecated */
export function getPhaseColorTheme(_index: number): SectionTheme {
	return PHASE_SECTION_THEME;
}

/** @deprecated */
export function getPhaseColorThemeForId(_id: string): SectionTheme {
	return PHASE_SECTION_THEME;
}
