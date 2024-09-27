import { UserForm } from "@/components/app/users/form";
import PageWithTitle from "@/components/ui/page-with-title";

export default function NewUser() {
  return <PageWithTitle title='New User'>
    <UserForm />
  </PageWithTitle>
}