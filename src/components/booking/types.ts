export interface BookingFormData {
  eventType: string;
  erwachsene: number;
  kinder: number;
  anrede: string;
  firmenname: string;
  ansprechpartnerVorname: string;
  ansprechpartnerNachname: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  nachricht: string;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface CustomDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export interface BookingSuccessProps {
  formData: BookingFormData;
  wunschtermin: Date | null;
  alternativDatum: Date | null;
  onClose: () => void;
}

export const initialFormData: BookingFormData = {
  eventType: "",
  erwachsene: 40,
  kinder: 0,
  anrede: "",
  firmenname: "",
  ansprechpartnerVorname: "",
  ansprechpartnerNachname: "",
  vorname: "",
  nachname: "",
  email: "",
  telefon: "",
  nachricht: "",
};
