import { useState } from 'react';

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(8);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const generatePassword = async () => {
    const res = await fetch(
      `/api/password?length=${length}&includeLowercase=${includeLowercase}&includeUppercase=${includeUppercase}&includeNumbers=${includeNumbers}&includeSpecialCharacters=${includeSpecialCharacters}`
    );
    const data = await res.json();
    setPassword(data.password);
};
const copyToClipboard = () => {
          if (password) {
            navigator.clipboard.writeText(password);
            alert('Password copied to clipboard!');
          }
        };

return (
<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
<h2 className="text-center text-3xl font-extrabold text-gray-900">Password Generator</h2>
<div className="mt-6">
<label htmlFor="password-length" className="block text-sm font-medium text-gray-700">
Password length:
</label>
<div className="mt-1">
<input
type="number"
name="password-length"
id="password-length"
className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
value={length}
onChange={(e) => setLength(parseInt(e.target.value, 10))}
/>
</div>
</div>
<div className="mt-6">
<div className="flex items-start">
<div className="flex items-center h-5">
<input
id="include-lowercase"
name="include-lowercase"
type="checkbox"
className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
checked={includeLowercase}
onChange={(e) => setIncludeLowercase(e.target.checked)}
/>
</div>
<div className="ml-3 text-sm">
<label htmlFor="include-lowercase" className="font-medium text-gray-700">
Include lowercase letters
</label>
</div>
</div>
<div className="flex items-start mt-2">
<div className="flex items-center h-5">
<input
id="include-uppercase"
name="include-uppercase"
type="checkbox"
className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
checked={includeUppercase}
onChange={(e) => setIncludeUppercase(e.target.checked)}
/>
</div>
<div className="ml-3 text-sm">
<label htmlFor="include-uppercase" className="font-medium text-gray-700">
Include uppercase letters
</label>
</div>
</div>
<div className="flex items-start mt-2">
<div className="flex items-center h-5">
<input
id="include-numbers"
name="include-numbers"
type="checkbox"
className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
checked={includeNumbers}
onChange={(e) => setIncludeNumbers(e.target.checked)}
/>
</div>
<div className="ml-3 text-sm">
<label htmlFor="include-numbers" className="font-medium text-gray-700">
Include numbers
</label>
</div>
</div>
<div className="flex items-start mt-2">
<div className="flex items-center h-5">
<input
id="include-special-characters"
name="include-special-characters"
type="checkbox"
className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" checked={includeSpecialCharacters}
onChange={(e) => setIncludeSpecialCharacters(e.target.checked)}
/>
</div>
<div className="ml-3 text-sm">
<label htmlFor="include-special-characters" className="font-medium text-gray-700">
Include special characters
</label>
</div>
</div>
</div>
<div className="mt-6">
<button
           type="button"
           className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           onClick={generatePassword}
         >
Generate Password
</button>
</div>

 {password && (
            <div className="mt-6">
              <label htmlFor="generated-password" className="block text-sm font-medium text-gray-700">
                Generated password:
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="generated-password"
                  id="generated-password"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md cursor-pointer"
                  value={password}
                  readOnly
                  onClick={copyToClipboard}
                />
              </div>
            </div>
          )}
</div>
</div>
</div>
);
}
