import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForms from "../LoginForms/LoginForms";
import RegisterForm from "../RegisterForm/RegisterForm";
export default function TabsForms() {
  return (
    <Tabs defaultValue="signin" className="w-[400px]">
        <TabsList className="grip w-full grid grid-cols-2">
            <TabsTrigger value="signin">Sing In</TabsTrigger>
            <TabsTrigger value="signup">Sing Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
            <Card>
                <CardContent>
                    <LoginForms/>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="signup">
            <Card>
                <CardContent>
                    <RegisterForm/>
                </CardContent>
            </Card>
        </TabsContent>
    </Tabs>
  )
}
