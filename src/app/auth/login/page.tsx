import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-between p-5 font-semibold font-sans">
      <form method="post" className="flex flex-col  ">
        <label htmlFor="email" className="mt-2 text-center">
          Email:
        </label>
        <input
          id="email"
          className="border-2 border-red-950"
          name="email"
          type="email"
          required
        />
        <label htmlFor="password" className="mt-2 text-center">
          Password:
        </label>
        <input
          id="password"
          className="border-2 border-red-950"
          name="password"
          type="password"
          required
        />
        <button formAction={login} className="mt-1 bg-red-950 text-white">
          Log in
        </button>
        <button formAction={signup} className="mt-1  bg-red-950 text-white">
          Sign up
        </button>
      </form>
    </div>
  );
}
