import { encryptedPwd } from '@utils/AuthUtils';

test('adds 1 + 2 to equal 3', async () => {
  const passwordString = '12345678';
  const password = await encryptedPwd(passwordString);

  expect(password.length).toBe(60);
});
