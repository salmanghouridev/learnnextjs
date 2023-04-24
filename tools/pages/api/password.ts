import { NextApiRequest, NextApiResponse } from 'next';

enum CharsetType {
  AlphaLower = 'abcdefghijklmnopqrstuvwxyz',
  AlphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  Numeric = '0123456789',
  Special = '!@#$%^&*()_+~`|}{[]:;?><,./-=',
}

interface PasswordOptions {
  length: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumbers: boolean;
  includeSpecialCharacters: boolean;
}

function generatePassword(options: PasswordOptions): string {
  let charset = '';
  if (options.includeLowercase) {
    charset += CharsetType.AlphaLower;
  }
  if (options.includeUppercase) {
    charset += CharsetType.AlphaUpper;
  }
  if (options.includeNumbers) {
    charset += CharsetType.Numeric;
  }
  if (options.includeSpecialCharacters) {
    charset += CharsetType.Special;
  }

  let password = '';
  for (let i = 0; i < options.length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { length, includeLowercase, includeUppercase, includeNumbers, includeSpecialCharacters } = req.query;

  if (typeof length === 'string') {
    const options: PasswordOptions = {
      length: parseInt(length, 10),
      includeLowercase: includeLowercase === 'true',
      includeUppercase: includeUppercase === 'true',
      includeNumbers: includeNumbers === 'true',
      includeSpecialCharacters: includeSpecialCharacters === 'true',
    };

    const password = generatePassword(options);
    res.status(200).json({ password });
  } else {
    res.status(400).json({ error: 'Invalid password length' });
  }
}
