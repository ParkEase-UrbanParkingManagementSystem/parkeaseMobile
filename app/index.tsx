import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const index = () =>{
  const { isSignedIn } = useAuth();
  if (isSignedIn) return <Redirect href="/(routes)/onboarding" />;
  return <Redirect href={"/(routes)/onboarding"}/>
}
export default index;