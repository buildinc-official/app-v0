/**
 * Shared dialog footer button chrome (outline + ring). Use with `variant="outline"`.
 * Cancel / Close — neutral
 */
export const modalButtonCancelClass =
	"h-11 w-full border-border/60 bg-background/80 text-foreground shadow-sm ring-1 ring-border/40 backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-primary/5 hover:ring-primary/25 sm:w-auto sm:min-w-[120px]";

/**
 * Confirm / submit / create / save / approve / request — success tone
 */
export const modalButtonConfirmClass =
	"h-11 w-full border-emerald-500/45 bg-background/80 text-emerald-800 shadow-sm ring-1 ring-emerald-500/30 backdrop-blur-sm transition-all hover:border-emerald-500/70 hover:bg-emerald-500/10 hover:text-emerald-950 hover:ring-emerald-500/45 dark:text-emerald-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-100 sm:w-auto sm:min-w-[160px]";

/**
 * Reject / destructive outline — rose (not solid fill)
 */
export const modalButtonDangerClass =
	"h-11 w-full border-rose-500/45 bg-background/80 text-rose-800 shadow-sm ring-1 ring-rose-500/30 backdrop-blur-sm transition-all hover:border-rose-500/70 hover:bg-rose-500/10 hover:text-rose-900 hover:ring-rose-500/45 dark:text-rose-300 dark:hover:bg-rose-950/40 dark:hover:text-rose-100 sm:w-auto sm:min-w-[120px]";

/**
 * Neutral actions that share a row (e.g. request payment + request material)
 */
export const modalButtonNeutralSplitClass =
	"h-11 w-full border-border/60 bg-background/80 text-foreground shadow-sm ring-1 ring-border/40 backdrop-blur-sm transition-all hover:border-primary/35 hover:bg-primary/5 hover:ring-primary/25 sm:flex-1";
