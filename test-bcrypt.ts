import bcrypt from 'bcryptjs';
async function test() {
  const hash = await bcrypt.hash('test', 10);
  console.log('Hash:', hash);
  const match = await bcrypt.compare('test', hash);
  console.log('Match:', match);
}
test();
