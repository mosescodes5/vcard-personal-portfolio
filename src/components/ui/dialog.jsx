import * as D from '@radix-ui/react-dialog';import {X} from 'lucide-react';import {cn} from '@/lib/utils';
export const Dialog=D.Root,DialogTitle=D.Title;
export const DialogContent=({className,children,...p})=><D.Portal><D.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"/>
 <D.Content aria-describedby={undefined} className={cn('fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-auto rounded-t-[1.75rem] bg-background p-6 pb-8 shadow-2xl sm:inset-auto sm:left-1/2 sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[1.75rem]',className)} {...p}><div className="mx-auto mb-4 h-1 w-9 rounded-full bg-muted-foreground/30 sm:hidden"/>{children}
 <D.Close className="absolute right-4 top-4 rounded-full bg-secondary p-1.5 opacity-80 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring" aria-label="Close"><X className="size-4"/></D.Close></D.Content></D.Portal>;
