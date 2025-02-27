import NewVideoTrigger from '@components/Channel/NewVideoTrigger'
import NotificationTrigger from '@components/Notifications/NotificationTrigger'
import Modal from '@components/UIElements/Modal'
import useAppStore from '@lib/store'
import usePersistStore from '@lib/store/persist'
import { HOME, NOTIFICATIONS } from '@utils/url-path'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgBell } from 'react-icons/cg'

import Login from './Auth/Login'
import GlobalSearchBar from './Search/GlobalSearchBar'

type Props = {
  className?: string
}

const Header: FC<Props> = ({ className }) => {
  const hasNewNotification = useAppStore((state) => state.hasNewNotification)
  const selectedChannelId = usePersistStore((state) => state.selectedChannelId)
  const [showShowModal, setSearchModal] = useState(false)

  return (
    <div
      className={clsx(
        'sticky top-0 left-0 right-0 z-10 flex w-full items-center bg-white dark:bg-black h-14 md:h-16',
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        <div className="md:w-[330px]">
          <Link href={HOME} className="block md:invisible">
            <img
              src="/lenstube.svg"
              draggable={false}
              className="w-5 h-5"
              alt="lenstube"
            />
          </Link>
        </div>
        <div className="hidden md:block">
          <GlobalSearchBar />
        </div>
        <div className="flex flex-row items-center justify-end space-x-3 md:w-96">
          <button
            type="button"
            onClick={() => setSearchModal(true)}
            className="outline-none md:hidden"
          >
            <AiOutlineSearch className="text-lg" aria-hidden="true" />
          </button>
          {selectedChannelId ? (
            <>
              <NotificationTrigger />
              <Link href={NOTIFICATIONS} className="relative p-1 md:hidden">
                <CgBell className="text-lg" />
                {hasNewNotification && (
                  <span className="absolute flex w-1.5 h-1.5 bg-red-500 rounded-full top-0 right-0" />
                )}
              </Link>
              <NewVideoTrigger />
            </>
          ) : null}
          <Login />
        </div>
      </div>

      <Modal
        title="Search"
        onClose={() => setSearchModal(false)}
        show={showShowModal}
        panelClassName="max-w-md h-full"
      >
        <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
          <GlobalSearchBar onSearchResults={() => setSearchModal(false)} />
        </div>
      </Modal>
    </div>
  )
}

export default Header
