import {cva} from 'class-variance-authority';import {cn} from '@/lib/utils';
const badgeVariants=cva('inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium',{variants:{variant:{default:'border-transparent bg-primary/10 text-primary',secondary:'border-transparent bg-secondary text-secondary-foreground',outline:'text-foreground'}},defaultVariants:{variant:'secondary'}});
export const Badge=({className,variant,...p})=><div className={cn(badgeVariants({variant}),className)} {...p}/>;
