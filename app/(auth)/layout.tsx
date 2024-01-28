import React from 'react' // import react

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-screen w-full items-center justify-center'>
        {children}
    </main>
  )
}

export default AuthLayout