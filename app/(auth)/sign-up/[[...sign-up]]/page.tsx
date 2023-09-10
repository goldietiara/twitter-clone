import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata = {
  title: `Sign Up | Twitter by Goldie Tiara"`,
};

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-10">
      <SignUp appearance={{ baseTheme: dark }} />
    </div>
  );
}
