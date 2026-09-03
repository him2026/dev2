import { getPhaseInfo } from './functions';

export async function generateAIResponse(message: string, phase: string, mood: string) {
  // In a real application, you would call an AI service like OpenAI or Anthropic here.
  // For this demonstration, we'll return a simulated response based on the input.
  
  const lowerMsg = message.toLowerCase();
  const phaseInfo = getPhaseInfo(phase);
  
  let response = "";
  
  if (lowerMsg.includes('cramp') || lowerMsg.includes('pain')) {
    response = `I'm sorry to hear you're experiencing cramps. During your ${phaseInfo.name}, this is quite common. A warm heating pad, gentle stretching, or chamomile tea might help soothe the pain. Would you like me to guide you through a relaxation breathing exercise?`;
  } else if (lowerMsg.includes('tired') || lowerMsg.includes('exhausted') || lowerMsg.includes('sleepy')) {
    response = `Feeling tired makes perfect sense right now. Your body is doing a lot of work. Please give yourself permission to rest. Even a 20-minute nap can make a big difference.`;
  } else if (lowerMsg.includes('hungry') || lowerMsg.includes('cravings') || lowerMsg.includes('food')) {
    response = `Food cravings are totally normal! Honor your body's needs. Dark chocolate, complex carbs like sweet potatoes, and foods rich in magnesium can be especially comforting and helpful right now.`;
  } else if (lowerMsg.includes('sad') || lowerMsg.includes('cry') || lowerMsg.includes('emotional')) {
    response = `It's completely okay to feel emotional. Your hormones are fluctuating, which directly affects how you feel. I'm here for you. Be gentle with yourself today.`;
  } else if (lowerMsg.includes('angry') || lowerMsg.includes('mad') || lowerMsg.includes('irritated')) {
    response = `I hear you. Irritability is a very common symptom. It's okay to take some space for yourself if you need it. Deep breathing can sometimes help take the edge off.`;
  } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi ') || lowerMsg === 'hi') {
    response = `Hello! I'm HIM, your wellness companion. How are you feeling today during your ${phaseInfo.name}?`;
  } else {
    // Generic phase-based responses
    if (phase === 'menstrual') {
      response = `I hear you. During your period, it's so important to prioritize rest and comfort. How else can I support you today?`;
    } else if (phase === 'follicular') {
      response = `That makes sense. In your follicular phase, you might start feeling a gradual increase in energy. What's on your mind?`;
    } else if (phase === 'ovulation') {
      response = `I understand. During ovulation, your energy and mood are often at their peak, but everyone is different. How can I help?`;
    } else if (phase === 'luteal') {
      response = `I'm here for you. The luteal phase can sometimes bring a dip in energy or mood changes. Make sure you're taking it easy. What else are you feeling?`;
    } else {
      response = `I'm here to listen and support you. Tell me more about what you're experiencing.`;
    }
  }
  
  // Add mood acknowledgment if relevant and not already addressed
  if (mood && mood !== 'neutral' && !lowerMsg.includes(mood)) {
    if (mood === 'anxious') {
      response += " I notice you're feeling anxious. Remember to take deep breaths.";
    }
  }

  // Simulate network delay
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  });
}
