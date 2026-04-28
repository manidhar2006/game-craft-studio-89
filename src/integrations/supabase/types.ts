export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      game_events: {
        Row: {
          created_at: string;
          event_data: Json;
          event_type: string;
          id: string;
          message: string;
          player_id: string | null;
          room_id: string;
        };
        Insert: {
          created_at?: string;
          event_data?: Json;
          event_type: string;
          id?: string;
          message: string;
          player_id?: string | null;
          room_id: string;
        };
        Update: {
          created_at?: string;
          event_data?: Json;
          event_type?: string;
          id?: string;
          message?: string;
          player_id?: string | null;
          room_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "game_events_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      principles: {
        Row: {
          base_rent: number;
          color_group: string;
          description: string | null;
          id: number;
          layer_1_rent: number;
          layer_2_rent: number;
          layer_3_rent: number;
          layer_cost: number;
          name: string;
          price: number;
          principle_no: number;
          tile_index: number;
        };
        Insert: {
          base_rent: number;
          color_group: string;
          description?: string | null;
          id: number;
          layer_1_rent: number;
          layer_2_rent: number;
          layer_3_rent: number;
          layer_cost: number;
          name: string;
          price: number;
          principle_no: number;
          tile_index: number;
        };
        Update: {
          base_rent?: number;
          color_group?: string;
          description?: string | null;
          id?: number;
          layer_1_rent?: number;
          layer_2_rent?: number;
          layer_3_rent?: number;
          layer_cost?: number;
          name?: string;
          price?: number;
          principle_no?: number;
          tile_index?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_id: number | null;
          created_at: string;
          display_name: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_id?: number | null;
          created_at?: string;
          display_name: string;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_id?: number | null;
          created_at?: string;
          display_name?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      questions: {
        Row: {
          category: string;
          correct_answer: string;
          explanation: string | null;
          id: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          principle_no: number;
          question_text: string;
        };
        Insert: {
          category?: string;
          correct_answer: string;
          explanation?: string | null;
          id?: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          principle_no: number;
          question_text: string;
        };
        Update: {
          category?: string;
          correct_answer?: string;
          explanation?: string | null;
          id?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          principle_no?: number;
          question_text?: string;
        };
        Relationships: [];
      };
      regulator_cards: {
        Row: {
          card_text: string;
          effect_data: Json;
          effect_type: string;
          id: string;
        };
        Insert: {
          card_text: string;
          effect_data?: Json;
          effect_type: string;
          id?: string;
        };
        Update: {
          card_text?: string;
          effect_data?: Json;
          effect_type?: string;
          id?: string;
        };
        Relationships: [];
      };
      room_players: {
        Row: {
          avatar_id: number | null;
          compliance_layers: Json;
          credits: number;
          display_name: string;
          id: string;
          in_jail: boolean;
          is_eliminated: boolean;
          jail_turns_remaining: number;
          joined_at: string;
          player_id: string;
          position: number;
          properties: Json;
          room_id: string;
          seat_order: number;
        };
        Insert: {
          avatar_id?: number | null;
          compliance_layers?: Json;
          credits?: number;
          display_name: string;
          id?: string;
          in_jail?: boolean;
          is_eliminated?: boolean;
          jail_turns_remaining?: number;
          joined_at?: string;
          player_id: string;
          position?: number;
          properties?: Json;
          room_id: string;
          seat_order?: number;
        };
        Update: {
          avatar_id?: number | null;
          compliance_layers?: Json;
          credits?: number;
          display_name?: string;
          id?: string;
          in_jail?: boolean;
          is_eliminated?: boolean;
          jail_turns_remaining?: number;
          joined_at?: string;
          player_id?: string;
          position?: number;
          properties?: Json;
          room_id?: string;
          seat_order?: number;
        };
        Relationships: [
          {
            foreignKeyName: "room_players_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
        ];
      };
      rooms: {
        Row: {
          code: string;
          created_at: string;
          current_turn_player_id: string | null;
          game_state: Json | null;
          host_id: string;
          id: string;
          max_players: number;
          status: Database["public"]["Enums"]["room_status"];
          updated_at: string;
        };
        Insert: {
          code: string;
          created_at?: string;
          current_turn_player_id?: string | null;
          game_state?: Json | null;
          host_id: string;
          id?: string;
          max_players?: number;
          status?: Database["public"]["Enums"]["room_status"];
          updated_at?: string;
        };
        Update: {
          code?: string;
          created_at?: string;
          current_turn_player_id?: string | null;
          game_state?: Json | null;
          host_id?: string;
          id?: string;
          max_players?: number;
          status?: Database["public"]["Enums"]["room_status"];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_room_member: {
        Args: { _room_id: string; _user_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      room_status: "waiting" | "in_progress" | "completed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      room_status: ["waiting", "in_progress", "completed"],
    },
  },
} as const;
