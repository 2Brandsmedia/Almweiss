"use client";

import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { BookingProvider, useBooking } from "@/context/BookingContext";
import BookingModal from "./BookingModal";
import CookieConsent from "./CookieConsent";
import "dayjs/locale/de";

function ModalRenderer() {
  const { isModalOpen, closeModal } = useBooking();
  return <BookingModal isOpen={isModalOpen} onClose={closeModal} />;
}

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <MantineProvider>
      <DatesProvider settings={{ locale: "de", firstDayOfWeek: 1 }}>
        <BookingProvider>
          {children}
          <ModalRenderer />
          <CookieConsent />
        </BookingProvider>
      </DatesProvider>
    </MantineProvider>
  );
}
