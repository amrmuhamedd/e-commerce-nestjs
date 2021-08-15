import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';
declare const LocalStartegy_base: new (...args: any[]) => Strategy;
export declare class LocalStartegy extends LocalStartegy_base {
    private moduleRef;
    constructor(moduleRef: ModuleRef);
    validate(request: Request, username: string, password: string): Promise<any>;
}
export {};
