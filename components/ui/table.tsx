import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export const Table = (props: PropsWithChildren) => {
  return (
    <table className='min-w-full divide-y divide-gray-300'>
      {props.children}
    </table>
  )
}

export type ThProps = PropsWithChildren<{
  plusClasses?: string
  overrideClasses?: string
}>

Table.Th = function TableTh(props: ThProps) {
  let classes = 'px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
  if (props.plusClasses) {
    classes = classNames(classes, props.plusClasses)
  } else if (props.overrideClasses) {
    classes = props.overrideClasses
  }

  return (
    <th scope='col' className={classes}>
      {props.children}
    </th>
  )
}

export type TdProps = PropsWithChildren<{
  plusClasses?: string
  overrideClasses?: string
}>

Table.Td = function TableTd(props: TdProps) {
  let classes = 'whitespace-nowrap px-3 py-4 text-sm text-left text-gray-500'
  if (props.plusClasses) {
    classes = classNames(classes, props.plusClasses)
  } else if (props.overrideClasses) {
    classes = props.overrideClasses
  }

  return <td className={classes}>{props.children}</td>
}

Table.Body = function TableBody(props: PropsWithChildren) {
  return <tbody className='divide-y divide-gray-300'>{props.children}</tbody>
}
