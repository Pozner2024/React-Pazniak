import React, { memo } from "react";

import "./ClientTableHeader.css";

const ClientTableHeader = memo(() => {
  return (
    <div className="client-header">
      <div className="client-cell">Фамилия</div>
      <div className="client-cell">Имя</div>
      <div className="client-cell">Отчество</div>
      <div className="client-cell">Баланс</div>
      <div className="client-cell">Статус</div>
      <div className="client-cell">Редактировать</div>
      <div className="client-cell">Удалить</div>
    </div>
  );
});

export default ClientTableHeader;
