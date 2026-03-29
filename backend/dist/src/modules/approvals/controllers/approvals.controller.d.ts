import { ApprovalsService } from '../services/approvals.service';
export declare class ApprovalsController {
    private readonly approvalsService;
    constructor(approvalsService: ApprovalsService);
    getPending(user: any): Promise<any[]>;
    approve(expenseId: string, comments: string, user: any): Promise<{
        status: string;
        reason: string;
    }>;
    reject(expenseId: string, comments: string, user: any): Promise<{
        status: string;
    }>;
    createTemplate(dto: any, companyId: string): Promise<{
        steps: ({
            approver: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            approverId: string;
            stepOrder: number;
            createdAt: Date;
            updatedAt: Date;
            templateId: string;
            roleLabel: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        name: string;
        conditionalRuleType: import("@prisma/client").$Enums.ConditionalRuleType;
        percentageThreshold: number | null;
        specificApproverId: string | null;
        isDefault: boolean;
    }>;
    getTemplates(companyId: string): Promise<({
        steps: ({
            approver: {
                id: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            approverId: string;
            stepOrder: number;
            createdAt: Date;
            updatedAt: Date;
            templateId: string;
            roleLabel: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        name: string;
        conditionalRuleType: import("@prisma/client").$Enums.ConditionalRuleType;
        percentageThreshold: number | null;
        specificApproverId: string | null;
        isDefault: boolean;
    })[]>;
    getTemplate(id: string, companyId: string): Promise<{
        steps: ({
            approver: {
                id: string;
                name: string;
                email: string;
            };
        } & {
            id: string;
            approverId: string;
            stepOrder: number;
            createdAt: Date;
            updatedAt: Date;
            templateId: string;
            roleLabel: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        name: string;
        conditionalRuleType: import("@prisma/client").$Enums.ConditionalRuleType;
        percentageThreshold: number | null;
        specificApproverId: string | null;
        isDefault: boolean;
    }>;
    updateTemplate(id: string, dto: any, companyId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        name: string;
        conditionalRuleType: import("@prisma/client").$Enums.ConditionalRuleType;
        percentageThreshold: number | null;
        specificApproverId: string | null;
        isDefault: boolean;
    }>;
    deleteTemplate(id: string, companyId: string): Promise<{
        message: string;
    }>;
    addStep(templateId: string, dto: any, companyId: string): Promise<{
        approver: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        approverId: string;
        stepOrder: number;
        createdAt: Date;
        updatedAt: Date;
        templateId: string;
        roleLabel: string | null;
    }>;
    deleteStep(id: string, companyId: string): Promise<{
        message: string;
    }>;
    createRoutingRule(dto: any, companyId: string): Promise<{
        template: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        templateId: string;
        minAmount: import("@prisma/client-runtime-utils").Decimal;
        maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
        priority: number;
        isActive: boolean;
    }>;
    getRoutingRules(companyId: string): Promise<({
        template: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        templateId: string;
        minAmount: import("@prisma/client-runtime-utils").Decimal;
        maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
        priority: number;
        isActive: boolean;
    })[]>;
    previewRouting(amount: string, companyId: string): Promise<{
        template: ({
            steps: ({
                approver: {
                    id: string;
                    name: string;
                };
            } & {
                id: string;
                approverId: string;
                stepOrder: number;
                createdAt: Date;
                updatedAt: Date;
                templateId: string;
                roleLabel: string | null;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            companyId: string;
            name: string;
            conditionalRuleType: import("@prisma/client").$Enums.ConditionalRuleType;
            percentageThreshold: number | null;
            specificApproverId: string | null;
            isDefault: boolean;
        }) | null;
        templateId: string;
        routingRuleId: string | null;
        amount: number;
        error?: undefined;
    } | {
        amount: number;
        error: any;
    }>;
    getRoutingRule(id: string, companyId: string): Promise<{
        template: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        templateId: string;
        minAmount: import("@prisma/client-runtime-utils").Decimal;
        maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
        priority: number;
        isActive: boolean;
    }>;
    updateRoutingRule(id: string, dto: any, companyId: string): Promise<{
        template: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        templateId: string;
        minAmount: import("@prisma/client-runtime-utils").Decimal;
        maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
        priority: number;
        isActive: boolean;
    }>;
    deleteRoutingRule(id: string, companyId: string): Promise<{
        message: string;
    }>;
    validateRules(rules: any[], companyId: string): Promise<{
        valid: boolean;
        issues: string[];
    }>;
}
