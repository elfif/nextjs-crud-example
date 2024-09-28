import { UserCreateForm } from "@/components/app/users/create-form";
import PageWithTitle from "@/components/ui/page-with-title";

export default function NewUser() {
  return <PageWithTitle title='New User'>
    <UserCreateForm />
  </PageWithTitle>
}