"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Mail, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getCurrentUser,
  getCandidateData,
  getNotificationsByUserId,
  getUnreadNotificationsCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  logout,
  type Notification,
} from "@/lib/storage";

export default function CandidateHeader() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [candidate, setCandidate] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    setUser(currentUser);

    if (currentUser.userType === "candidate") {
      const candidateData = getCandidateData(currentUser.cpfOrCnpj);
      setCandidate(candidateData);
    }

    // Load notifications
    const userNotifications = getNotificationsByUserId(currentUser.id);
    setNotifications(userNotifications);
    setUnreadCount(getUnreadNotificationsCount(currentUser.id));
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleMarkAllAsRead = () => {
    if (user) {
      markAllNotificationsAsRead(user.id);
      setUnreadCount(0);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, isRead: true })),
      );
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
      setUnreadCount((prev) => Math.max(0, prev - 1));
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notification.id ? { ...notif, isRead: true } : notif,
        ),
      );
    }
  };

  if (!user) return null;

  const displayName =
    candidate?.personal?.fullName || user.fullName || "Usuário";
  const displayEmail = candidate?.personal?.email || user.email;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/candidate">
            <Image
              src="/assets/img/logo/matchjoblogo.png"
              alt="MatchJobs"
              width={120}
              height={30}
              className="h-auto"
            />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Messages */}
          <div className="relative">
            <button
              onClick={() => setShowMessages(!showMessages)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <Mail size={20} />
            </button>
            {showMessages && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Mensagens</h3>
                    <button className="text-sm text-blue-600">
                      Marcar todas como lidas
                    </button>
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="p-4 hover:bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Jimmy Denis</p>
                        <p className="text-sm text-gray-600">Como você está?</p>
                        <p className="text-xs text-gray-500">5 min atrás</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full relative"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">
                      {notifications.length > 0
                        ? `Você tem ${unreadCount} notificações`
                        : "Nenhuma notificação"}
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      <p className="text-sm">Nenhuma notificação ainda.</p>
                    </div>
                  ) : (
                    notifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              notification.type === "application"
                                ? "bg-blue-100"
                                : notification.type === "interview"
                                  ? "bg-green-100"
                                  : notification.type === "profile_view"
                                    ? "bg-purple-100"
                                    : "bg-gray-100"
                            }`}
                          >
                            <User
                              size={16}
                              className={
                                notification.type === "application"
                                  ? "text-blue-600"
                                  : notification.type === "interview"
                                    ? "text-green-600"
                                    : notification.type === "profile_view"
                                      ? "text-purple-600"
                                      : "text-gray-600"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                notification.createdAt,
                              ).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
            >
              <Image
                src="/assets/img/sauro.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-left">
                <p className="text-sm text-gray-600">Olá,</p>
                <p className="text-sm font-semibold">Enzo</p>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <Image
                      src="/assets/img/sauro.jpg"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">Enzo</p>
                      <p className="text-sm text-gray-600">
                        enzogabriel@gmail.com
                      </p>
                      <Link
                        href="/dashboard/candidate"
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Ver Perfil
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
