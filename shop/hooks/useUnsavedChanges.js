// Хук для отслеживания несохраненных изменений в приложении
import { useState, useCallback, useEffect } from "react";

const useUnsavedChanges = () => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [unsavedSections, setUnsavedSections] = useState(new Set());

  // Функция для регистрации несохраненных изменений в конкретной секции
  const markSectionAsChanged = useCallback((sectionId) => {
    setUnsavedSections(prev => {
      const newSet = new Set(prev);
      newSet.add(sectionId);
      return newSet;
    });
    setHasUnsavedChanges(true);
  }, []);

  // Функция для пометки секции как сохраненной
  const markSectionAsSaved = useCallback((sectionId) => {
    setUnsavedSections(prev => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  }, []);

  // Функция для очистки всех несохраненных изменений
  const clearAllUnsavedChanges = useCallback(() => {
    setUnsavedSections(new Set());
    setHasUnsavedChanges(false);
  }, []);

  // Функция для проверки, есть ли несохраненные изменения в конкретной секции
  const hasSectionChanges = useCallback((sectionId) => {
    return unsavedSections.has(sectionId);
  }, [unsavedSections]);

  // Обновляем общий статус при изменении секций
  useEffect(() => {
    setHasUnsavedChanges(unsavedSections.size > 0);
  }, [unsavedSections]);

  // Функция для получения сообщения о несохраненных изменениях
  const getUnsavedMessage = useCallback(() => {
    const sectionsArray = Array.from(unsavedSections);
    if (sectionsArray.length === 0) return "";
    
    if (sectionsArray.length === 1) {
      return `You have unsaved changes in ${sectionsArray[0]}. Do you want to leave without saving?`;
    }
    
    return `You have unsaved changes in ${sectionsArray.length} sections: ${sectionsArray.join(', ')}. Do you want to leave without saving?`;
  }, [unsavedSections]);

  return {
    hasUnsavedChanges,
    unsavedSections: Array.from(unsavedSections),
    markSectionAsChanged,
    markSectionAsSaved,
    clearAllUnsavedChanges,
    hasSectionChanges,
    getUnsavedMessage
  };
};

export default useUnsavedChanges;
