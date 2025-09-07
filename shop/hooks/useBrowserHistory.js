// Хук для управления историей браузера и предотвращения потери данных
import { useEffect, useCallback, useRef } from "react";

const useBrowserHistory = (
  activeSection,
  setActiveSection,
  hasUnsavedChanges = false,
  unsavedMessage = "You have unsaved changes. Do you want to leave without saving?"
) => {
  const hasUnsavedChangesRef = useRef(hasUnsavedChanges);
  const isNavigatingRef = useRef(false);

  // Обновляем ref при изменении состояния
  useEffect(() => {
    hasUnsavedChangesRef.current = hasUnsavedChanges;
  }, [hasUnsavedChanges]);

  // Функция для безопасной навигации с проверкой несохраненных данных
  const navigateToSection = useCallback(
    (sectionId) => {
      // Если есть несохраненные изменения, показываем предупреждение
      if (hasUnsavedChangesRef.current) {
        const shouldLeave = window.confirm(unsavedMessage);
        if (!shouldLeave) {
          return false; // Отменяем навигацию
        }
      }

      // Выполняем навигацию
      isNavigatingRef.current = true;
      setActiveSection(sectionId);

      // Обновляем URL без перезагрузки страницы
      const url = new URL(window.location);
      url.searchParams.set("section", sectionId);
      window.history.pushState({ section: sectionId }, "", url);

      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 100);

      return true; // Навигация успешна
    },
    [setActiveSection, unsavedMessage]
  );

  // Обработчик события popstate (кнопки назад/вперед браузера)
  useEffect(() => {
    const handlePopState = (event) => {
      // Предотвращаем навигацию если есть несохраненные изменения
      if (hasUnsavedChangesRef.current && !isNavigatingRef.current) {
        const shouldLeave = window.confirm(unsavedMessage);
        if (!shouldLeave) {
          // Возвращаем пользователя обратно
          const url = new URL(window.location);
          url.searchParams.set("section", activeSection);
          window.history.pushState({ section: activeSection }, "", url);
          return;
        }
      }

      // Извлекаем секцию из состояния или URL
      const targetSection =
        (event.state && event.state.section) ||
        new URLSearchParams(window.location.search).get("section") ||
        "catalog";

      isNavigatingRef.current = true;
      setActiveSection(targetSection);
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeSection, setActiveSection, unsavedMessage]);

  // Обработчик события beforeunload (обновление страницы, закрытие вкладки)
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedChangesRef.current) {
        event.preventDefault();
        event.returnValue = unsavedMessage; // Для старых браузеров
        return unsavedMessage; // Для современных браузеров
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [unsavedMessage]);

  // Инициализация URL при загрузке
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = urlParams.get("section");

    if (sectionFromUrl && sectionFromUrl !== activeSection) {
      // Проверяем, является ли секция из URL валидной
      const validSections = [
        "catalog",
        "reviews",
        "profile",
        "about",
        "contact",
        "cart",
      ];
      if (validSections.includes(sectionFromUrl)) {
        setActiveSection(sectionFromUrl);
      } else {
        // Если секция невалидная, устанавливаем дефолтную и обновляем URL
        const url = new URL(window.location);
        url.searchParams.set("section", activeSection);
        window.history.replaceState({ section: activeSection }, "", url);
      }
    } else if (!sectionFromUrl) {
      // Если в URL нет секции, добавляем текущую
      const url = new URL(window.location);
      url.searchParams.set("section", activeSection);
      window.history.replaceState({ section: activeSection }, "", url);
    }
  }, []); // Выполняется только при монтировании

  return {
    navigateToSection,
    currentSection: activeSection,
  };
};

export default useBrowserHistory;
