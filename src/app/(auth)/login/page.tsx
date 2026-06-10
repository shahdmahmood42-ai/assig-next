import LoginForm from "./LoginForm";

export default function Login() {
  // process.env.NEXTAUTH_SECRET;
  return (
    <div className="bg-amber-50 p-3 w-10/12 mx-auto">
      <h1 className="text-xl my-3">Login with Your Fresh Cart</h1>
      <LoginForm />
    </div>
  );
}
