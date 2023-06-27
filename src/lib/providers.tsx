"use client";

import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";

Amplify.configure({ ...awsconfig, ssr: true });

export default function AmplifyProvider({ children }: React.PropsWithChildren) {
  return (
    <>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </>
  );
}
