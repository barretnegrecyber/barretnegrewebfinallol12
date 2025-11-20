import React from 'react';

export type Language = 'es' | 'ca';

export interface Message {
    role: 'user' | 'model';
    text: string;
    timestamp: Date;
}

export enum TerminalState {
    IDLE,
    PROCESSING,
    ERROR,
    SUCCESS
}

export interface ServiceItem {
    title: string;
    description: string;
    icon: React.ElementType;
    tags: string[];
}