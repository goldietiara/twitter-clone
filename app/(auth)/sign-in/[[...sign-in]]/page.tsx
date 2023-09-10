import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata = {
  title: `Sign In | Twitter by Goldie Tiara"`,
};

export default function Page() {
  return (
    <div className="w-full h-full flex items-center justify-center pt-10">
      <SignIn appearance={{ baseTheme: dark }} />
    </div>
  );
}
