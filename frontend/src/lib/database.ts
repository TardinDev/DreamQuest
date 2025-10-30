// Database types and API (will use Supabase backend when configured)

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface UserCredits {
  user_id: string
  image_credits: number
  video_credits: number
  game_credits: number
  total_spent: number
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  credits_purchased: number
  credit_type: 'image' | 'video' | 'game' | 'bundle'
  payment_method: 'stripe' | 'paypal'
  payment_id: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

export interface FreeUsage {
  session_id: string
  ip_address?: string
  images_used: number
  videos_used: number
  last_used: string
  created_at: string
}

// API functions (demo mode - will connect to Supabase later)
export const database = {
  async getUserCredits(userId: string): Promise<UserCredits | null> {
    // TODO: Connect to Supabase backend
    // For demo: return sample credits
    return {
      user_id: userId,
      image_credits: 50,
      video_credits: 10,
      game_credits: 5,
      total_spent: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  },

  async updateUserCredits(userId: string, credits: Partial<UserCredits>): Promise<void> {
    // TODO: Connect to Supabase backend
    console.log('Credits updated (demo mode):', userId, credits)
  },

  async createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<void> {
    // TODO: Connect to Supabase backend
    console.log('Transaction created (demo mode):', transaction)
  },

  async getTransactionHistory(_userId: string): Promise<Transaction[]> {
    // TODO: Connect to Supabase backend
    return []
  },
}
