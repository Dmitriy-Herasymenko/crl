'use client';

import { useState } from 'react';

function fileKind(href) {
  const ext = href.split('.').pop().toLowerCase();
  if (ext === 'xls' || ext === 'xlsx') return { label: 'XLS', colorClass: 'svc-ico2--green' };
  if (ext === 'pdf') return { label: 'PDF', colorClass: 'svc-ico2--blue' };
  return { label: 'Файл', colorClass: 'svc-ico2--gray' };
}

function docWord(n) {
  if (n === 1) return 'документ';
  if (n >= 2 && n <= 4) return 'документи';
  return 'документів';
}

export default function YearAccordion({ groups }) {
  const [openYear, setOpenYear] = useState(groups[0]?.year ?? null);

  return (
    <div className="space-y-3 reveal">
      {groups.map((group) => {
        const isOpen = openYear === group.year;
        return (
          <div key={group.year} className={`year-group${isOpen ? ' is-open' : ''}`}>
            <button
              type="button"
              className="year-group-summary"
              aria-expanded={isOpen}
              onClick={() => setOpenYear((v) => (v === group.year ? null : group.year))}
            >
              <span className="year-group-dot" aria-hidden="true"></span>
              <h3 className="year-group-title">{group.year}</h3>
              <span className="year-group-count">{group.documents.length} {docWord(group.documents.length)}</span>
              <span className="flex-1"></span>
              <svg className="year-group-chevron" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="year-group-collapse" style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}>
              <div className="year-group-inner">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {group.documents.map((doc) => {
                    const kind = fileKind(doc.href);
                    return (
                      <a key={doc.href} href={doc.href} target="_blank" rel="noopener" className="svc-card2">
                        <span className={`svc-ico2 ${kind.colorClass}`}>
                          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </span>
                        <div className="svc-body">
                          <h3 className="svc-name">{doc.title}</h3>
                        </div>
                        <div className="svc-footer">
                          <span className="svc-link">Переглянути {kind.label}</span>
                          <svg className="svc-arrow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
