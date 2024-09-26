import { PropsWithChildren } from "react";

export default function PageWithTitle(props: PropsWithChildren<{ title: string }>) {
  return (
    <>
      <h1 className='text-4xl mt-16 ml-4 mb-8'>{props.title}</h1>
      <div className='px-4 sm:px-6 lg:px-8'>
        {props.children}
      </div>
    </>
  );

}