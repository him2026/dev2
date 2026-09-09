const { createClient } = require('@supabase/supabase-js');

async function testAuthFlow() {
  const email = `testuser_${Date.now()}@example.com`;
  const password = "password123";

  console.log("Testing Registration Flow...");
  const resReg = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: "Test User",
      email: email,
      password: password,
      date_of_birth: "2000-01-01",
      last_period_start: "2026-09-01",
      avg_cycle_length: "28"
    })
  });
  const regJson = await resReg.json();
  console.log("Registration Response:", regJson);

  if (!resReg.ok) {
    console.error("Registration failed!");
    process.exit(1);
  }

  console.log("\nTesting Login Flow...");
  const resLog = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });
  const logJson = await resLog.json();
  console.log("Login Response:", logJson);

  if (!resLog.ok) {
    console.error("Login failed!");
    process.exit(1);
  }

  console.log("\nAuth Flow Test Passed!");
}

testAuthFlow();
