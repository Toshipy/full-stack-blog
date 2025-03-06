import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { auth } from '@/auth'
import Setting from './Setting'

export default async function PrivateHeader() {
  const session = await auth()
  if (!session?.user?.email) throw new Error('不正なリクエストです')
  return (
    <div>
      <header className="border-b bg-indigo-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className="text-2xl font-bold text-white">
                    管理ページ
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Setting session={session} />
        </div>
      </header>
    </div>
  )
}
