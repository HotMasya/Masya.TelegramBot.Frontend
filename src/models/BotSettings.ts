export interface BotSettings {
    id: number;
    token: string;
    webhookHost: string;
    isEnabled: boolean;
    botUser: {
        id: number;
        first_name: string;
        last_name: string;
        username: string;
        can_join_groups?: boolean;
        can_read_all_group_messages?: boolean;
        supports_inline_queries?: boolean;
        is_bot?: boolean;
    }
}