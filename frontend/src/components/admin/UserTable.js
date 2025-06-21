import React, { useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import moment from 'moment';
import { Table } from 'react-bootstrap';

const UserTable = ({ users }) => {
  const data = useMemo(() => users, [users]);

  const columns = useMemo(
    () => [
      {
        header: 'Фамилия',
        accessorKey: 'surname',
      },
      {
        header: 'Имя',
        accessorKey: 'name',
      },
      {
        header: 'Отчество',
        accessorKey: 'patronymic',
      },
      {
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'Дата рождения',
        accessorKey: 'birth_date',
        cell: info => moment(info.getValue()).format('DD.MM.YYYY'),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;

