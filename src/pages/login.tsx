import React, { useState } from "react";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/index";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login diakses");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md rounded-[32px] border-slate-100 shadow-xl overflow-hidden bg-white">
        <CardHeader className="bg-primary text-white p-8 text-center space-y-2">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-tubaba-heavy text-2xl uppercase tracking-tight">
            Admin Login
          </CardTitle>
          <p className="text-sm text-white/70 font-light italic">
            Portal Internal Satu Data Tubaba
          </p>
        </CardHeader>

        <CardContent className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-xs font-bold uppercase text-slate-400 tracking-widest"
              >
                Username
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username admin"
                  className="pl-10 h-12 rounded-xl border-slate-200 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-xs font-bold uppercase text-slate-400 tracking-widest"
              >
                Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-300 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 rounded-xl border-slate-200 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-tubaba font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Masuk Sistem <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Lupa akses? Hubungi tim IT Kominfo Tubaba
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
