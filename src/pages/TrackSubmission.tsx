import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Mail, Key, Lock } from "lucide-react";

const TrackSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<"id-email" | "otp">("id-email");
  const [submissionId, setSubmissionId] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First verify the submission exists
      const { data: submission, error: submissionError } = await supabase
        .from("startup_submissions")
        .select("id")
        .eq("id", submissionId)
        .eq("email", email)
        .single();

      if (submissionError || !submission) {
        throw new Error("Invalid submission ID or email");
      }

      // Generate and store OTP
      const verificationCode = Math.random().toString(36).slice(-6).toUpperCase();
      const { error: otpError } = await supabase
        .from("submission_verification_codes")
        .insert({
          submission_id: submissionId,
          email,
          verification_code: verificationCode,
        });

      if (otpError) throw otpError;

      // Send verification email
      const { error: emailError } = await supabase.functions.invoke("send-verification-email", {
        body: { email, verificationCode },
      });

      if (emailError) throw emailError;

      toast({
        title: "Verification Code Sent",
        description: "Please check your email for the verification code.",
      });

      setStep("otp");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: verification, error: verificationError } = await supabase
        .from("submission_verification_codes")
        .select("*")
        .eq("submission_id", submissionId)
        .eq("email", email)
        .eq("verification_code", otp)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (verificationError || !verification) {
        throw new Error("Invalid or expired verification code");
      }

      // Mark OTP as used
      await supabase
        .from("submission_verification_codes")
        .update({ used: true })
        .eq("id", verification.id);

      // Navigate to submission status page with verified state
      navigate("/submission-confirmation", {
        state: { submissionId, verified: true }
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container max-w-md mx-auto px-4">
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-text-primary">
              Track Your Submission
            </h1>
            <p className="text-text-secondary">
              {step === "id-email"
                ? "Enter your submission details to receive a verification code"
                : "Enter the verification code sent to your email"}
            </p>
          </div>

          {step === "id-email" ? (
            <form onSubmit={handleRequestOTP} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="submissionId" className="text-sm font-medium">
                  Submission ID
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-2.5 h-5 w-5 text-text-secondary" />
                  <Input
                    id="submissionId"
                    placeholder="Enter your submission ID"
                    value={submissionId}
                    onChange={(e) => setSubmissionId(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-text-secondary" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Verification Code</label>
                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={(value) => setOtp(value)}
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, idx) => (
                          <InputOTPSlot key={idx} {...slot} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify Code"}
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
};

export default TrackSubmission;