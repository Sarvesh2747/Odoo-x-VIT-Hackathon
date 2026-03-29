import { PrismaService } from '../../prisma/prisma.service';
import { ApprovalEngineService } from './approval-engine.service';
import { TemplateRoutingService } from './template-routing.service';
export declare class ApprovalsService {
    private prisma;
    private engine;
    private routingService;
    constructor(prisma: PrismaService, engine: ApprovalEngineService, routingService: TemplateRoutingService);
    initializeApprovalChain(expenseId: string, companyId: string, convertedAmount: number, submittedById: string): Promise<void>;
    approve(expenseId: string, approverId: string, companyId: string, comments?: string): Promise<{
        status: string;
        reason: string;
    }>;
    reject(expenseId: string, approverId: string, companyId: string, comments: string): Promise<{
        status: string;
    }>;
    getPendingForApprover(approverId: string, companyId: string): Promise<any[]>;
    createTemplate(companyId: string, dto: {
        name: string;
        conditionalRuleType?: string;
        percentageThreshold?: number;
        specificApproverId?: string;
        isDefault?: boolean;
    }): Promise<{
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
    updateTemplate(id: string, companyId: string, dto: any): Promise<{
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
    addStep(templateId: string, companyId: string, dto: {
        approverId: string;
        stepOrder: number;
        roleLabel?: string;
    }): Promise<{
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
    deleteStep(stepId: string, companyId: string): Promise<{
        message: string;
    }>;
    createRoutingRule(companyId: string, dto: any): Promise<{
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
    updateRoutingRule(id: string, companyId: string, dto: any): Promise<{
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
    validateRoutingRules(companyId: string, rules: any[]): Promise<{
        valid: boolean;
        issues: string[];
    }>;
    previewRouting(companyId: string, amount: number): Promise<{
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
}
