import { createContext, ReactNode, useContext, useState } from "react";

interface Reminder {
  title: string;
  latitude: number;
  longitude: number;
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(
  undefined,
);

export const useReminders = () => {
  const context = useContext(ReminderContext);

  if (!context)
    throw new Error("useReminder must be used inside ReminderProvider");

  return context;
};

export const ReminderProvider = ({ children }: { children: ReactNode }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
