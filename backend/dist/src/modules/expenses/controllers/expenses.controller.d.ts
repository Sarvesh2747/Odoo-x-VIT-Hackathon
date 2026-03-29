import { ExpenseStatus } from '@prisma/client';
import { ExpensesService } from '../services/expenses.service';
import { CreateExpenseDto } from '../dto/create-expense.dto';
import { ApprovalsService } from '../../approvals/services/approvals.service';
export declare class ExpensesController {
    private readonly expensesService;
    private readonly approvalsService;
    constructor(expensesService: ExpensesService, approvalsService: ApprovalsService);
    create(dto: CreateExpenseDto, user: any): Promise<{
        submittedBy: {
            id: string;
            name: string;
            email: string;
        };
        template: {
            id: string;
            name: string;
        } | null;
        routingRule: {
            id: string;
            minAmount: import("@prisma/client-runtime-utils").Decimal;
            maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
            priority: number;
        } | null;
        approvals: ({
            approver: {
                id: string;
                name: string;
                email: string;
            };
        } & {
            comments: string | null;
            id: string;
            expenseId: string;
            approverId: string;
            stepOrder: number;
            status: import("@prisma/client").$Enums.ApprovalStatus;
            actionedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ocrJob: {
            id: string;
            expenseId: string;
            status: import("@prisma/client").$Enums.OcrJobStatus;
            createdAt: Date;
            updatedAt: Date;
            rawResponse: import("@prisma/client/runtime/client").JsonValue | null;
            parsedData: import("@prisma/client/runtime/client").JsonValue | null;
        } | null;
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        submittedById: string;
        templateId: string | null;
        routingRuleId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        convertedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        companyCurrency: string | null;
        exchangeRateUsed: import("@prisma/client-runtime-utils").Decimal | null;
        rateTimestamp: Date | null;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string;
        date: Date;
        receiptUrl: string | null;
        ocrExtracted: boolean;
    }>;
    findAll(user: any, status?: ExpenseStatus, category?: string, page?: string, limit?: string): Promise<import("../../../common/utils/pagination.util").PaginatedResult<{
        submittedBy: {
            id: string;
            name: string;
            email: string;
        };
        template: {
            id: string;
            name: string;
        } | null;
        approvals: ({
            approver: {
                id: string;
                name: string;
                email: string;
            };
        } & {
            comments: string | null;
            id: string;
            expenseId: string;
            approverId: string;
            stepOrder: number;
            status: import("@prisma/client").$Enums.ApprovalStatus;
            actionedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        submittedById: string;
        templateId: string | null;
        routingRuleId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        convertedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        companyCurrency: string | null;
        exchangeRateUsed: import("@prisma/client-runtime-utils").Decimal | null;
        rateTimestamp: Date | null;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string;
        date: Date;
        receiptUrl: string | null;
        ocrExtracted: boolean;
    }>>;
    getStats(companyId: string): Promise<{
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        cancelled: number;
        totalApprovedAmount: number | import("@prisma/client-runtime-utils").Decimal;
    }>;
    findOne(id: string, user: any): Promise<{
        submittedBy: {
            id: string;
            name: string;
            email: string;
        };
        template: {
            id: string;
            name: string;
        } | null;
        routingRule: {
            id: string;
            minAmount: import("@prisma/client-runtime-utils").Decimal;
            maxAmount: import("@prisma/client-runtime-utils").Decimal | null;
            priority: number;
        } | null;
        approvals: ({
            approver: {
                id: string;
                name: string;
                email: string;
            };
        } & {
            comments: string | null;
            id: string;
            expenseId: string;
            approverId: string;
            stepOrder: number;
            status: import("@prisma/client").$Enums.ApprovalStatus;
            actionedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        })[];
        ocrJob: {
            id: string;
            expenseId: string;
            status: import("@prisma/client").$Enums.OcrJobStatus;
            createdAt: Date;
            updatedAt: Date;
            rawResponse: import("@prisma/client/runtime/client").JsonValue | null;
            parsedData: import("@prisma/client/runtime/client").JsonValue | null;
        } | null;
    } & {
        id: string;
        status: import("@prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        submittedById: string;
        templateId: string | null;
        routingRuleId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        convertedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        companyCurrency: string | null;
        exchangeRateUsed: import("@prisma/client-runtime-utils").Decimal | null;
        rateTimestamp: Date | null;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string;
        date: Date;
        receiptUrl: string | null;
        ocrExtracted: boolean;
    }>;
    cancel(id: string, user: any): Promise<{
        id: string;
        status: import("@prisma/client").$Enums.ExpenseStatus;
        createdAt: Date;
        updatedAt: Date;
        companyId: string;
        submittedById: string;
        templateId: string | null;
        routingRuleId: string | null;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        convertedAmount: import("@prisma/client-runtime-utils").Decimal | null;
        companyCurrency: string | null;
        exchangeRateUsed: import("@prisma/client-runtime-utils").Decimal | null;
        rateTimestamp: Date | null;
        category: import("@prisma/client").$Enums.ExpenseCategory;
        description: string;
        date: Date;
        receiptUrl: string | null;
        ocrExtracted: boolean;
    }>;
}
