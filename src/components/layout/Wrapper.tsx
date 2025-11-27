import type { ElementType, HtmlHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HtmlHTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  wrapperClassName?: string;
  children: ReactNode;
}

const Wrapper = ({
  as = 'section',
  children,
  wrapperClassName,
  className,
  ...props
}: Props) => {
  const Tag = as;
  return (
    <Tag
      className={cn('py-10 sm:py-16 lg:py-20 xl:py-24', wrapperClassName)}
      {...props}
    >
      <main className={cn('layout', className)}>{children}</main>
    </Tag>
  );
};

export default Wrapper;
