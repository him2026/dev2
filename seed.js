const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ehfcfprgvsfcdwjgpmzo.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_hXV0bVWpfXvaazbjaw8DrQ_YR3CPU-Q";

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  const email = 'karrinki9608@gmail.com';
  const password = 'Rinki@26';
  const hashedPassword = await bcrypt.hash(password, 10);

  // Try to insert the admin user
  const { data: user, error } = await supabase
    .from('users')
    .insert({
      full_name: 'Admin User',
      email: email,
      password_hash: hashedPassword,
      role: 'admin',
      date_of_birth: '1995-01-01T00:00:00Z',
      is_active: true
    })
    .select()
    .single();

  if (error) {
    // Supabase returns 23505 for unique constraint violation
    if (error.code === '23505') {
      console.log('Admin user already exists. Updating password...');
      const { error: updateError } = await supabase
        .from('users')
        .update({ password_hash: hashedPassword })
        .eq('email', email);
      
      if (updateError) {
        console.error('Error updating admin password:', updateError);
      } else {
        console.log('Admin password updated successfully');
      }
    } else {
      console.error('Error seeding database:', error);
    }
  } else {
    console.log('Admin user created successfully');
  }
}

seed();
