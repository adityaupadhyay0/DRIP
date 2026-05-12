import { supabase } from './supabase';
import { generateEmbedding } from './ai/embeddings';

export async function updatePersonaProfile(userId: string, action: 'save' | 'skip' | 'search', metadata: any) {
  // 1. Fetch current persona
  const { data: user } = await supabase.from('users').select('persona_profile').eq('id', userId).single();
  let profile = user?.persona_profile || { aesthetics: {}, behavior: [] };

  // 2. Update based on action
  if (action === 'save') {
    // Increase weight of specific aesthetic
    const tags = metadata.aesthetic_tags || [];
    tags.forEach((tag: string) => {
      profile.aesthetics[tag] = (profile.aesthetics[tag] || 0) + 1;
    });
  }

  // 3. Save back to Supabase
  await supabase.from('users').update({ persona_profile: profile }).eq('id', userId);
}

export async function getPersonaTheme(userId: string) {
  const { data: user } = await supabase.from('users').select('persona_profile').eq('id', userId).single();
  const aesthetics = user?.persona_profile?.aesthetics || {};

  // Find dominant aesthetic
  const dominant = Object.entries(aesthetics).sort((a: any, b: any) => b[1] - a[1])[0]?.[0];

  return dominant || 'default';
}
