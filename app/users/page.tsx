import { Button } from '@/components/ui/button'
import { fetchUsers } from '@/db/queries/users'
import { Table } from '@/components/ui/table'
import { CheckIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import PageWithTitle from '@/components/ui/page-with-title'

export default async function Users() {
  const users = await fetchUsers()

  return (
    <PageWithTitle title='Users'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <p className='mt-2 text-sm text-gray-700'>
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <Link href='/users/new'>
            <Button>New User</Button>
          </Link>
        </div>
      </div>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <Table>
              <thead>
                <tr>
                  <Table.Th>Nom</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Admin</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </tr>
              </thead>
              <Table.Body>
                {users.map(user => (
                  <tr key={user.id}>
                    <Table.Td>{user.name}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>
                      {user.admin && <CheckIcon className='w-6 h-6' />}
                    </Table.Td>
                    <Table.Td>
                      <div className='flex flex-row gap-x-2'>
                        <Button size='sm'>Edit</Button>
                        <Button variant={'destructive'} size='sm'>
                          Delete
                        </Button>
                      </div>
                    </Table.Td>
                  </tr>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </PageWithTitle>
  )
}
