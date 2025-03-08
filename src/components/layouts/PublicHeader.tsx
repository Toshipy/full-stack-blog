'use client'

import Link from 'next/link'
import * as React from 'react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@/components/ui/navigation-menu'
import { SearchBox } from '../post/SearchBox'
import { Button } from '../ui/button'

export function PublicHeader() {
  return (
    <div className="">
      <header className="border-b bg-indigo-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className="text-2xl font-bold text-white">
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button asChild>
              <Link href="/register">新規登録</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
