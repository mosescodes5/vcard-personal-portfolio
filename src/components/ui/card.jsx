import * as React from 'react';import {cn} from '@/lib/utils';
const mk=(base)=>React.forwardRef(({className,...p},ref)=><div ref={ref} className={cn(base,className)} {...p}/>);
export const Card=mk('rounded-[1.25rem] bg-card text-card-foreground shadow-[0_1px_3px_rgba(0,0,0,.06)]');
export const CardHeader=mk('flex flex-col space-y-1.5 p-5');
export const CardTitle=mk('font-semibold leading-none tracking-tight');
export const CardDescription=mk('text-sm text-muted-foreground');
export const CardContent=mk('p-5 pt-0');
