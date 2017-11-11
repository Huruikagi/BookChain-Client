import { TestBed, inject } from '@angular/core/testing';

import { BookCacheService } from './book-cache.service';
import { IBook } from '../../model/book/ibook';

describe('BookCacheService', () => {

  let testData: IBook;
  let fakeStorage;

  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCacheService]
    });

    // �_�~�[�{�ƃ_�~�[���[�J���X�g���[�W�̗p��
    testData =  {
      id:            'm2BpPQAACAAJ',
      isbn10:        '4062639149',
      isbn13:        '9784062639149',
      title:         '�V��̖I',
      authors:       ['����\��'],
      publishedDate: '1998',
      thumbnailURL:  'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    };

    fakeStorage = {'bookchain-Angular-book': {} };

    // ���[�J���X�g���[�W�̒u������
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake((key) =>  {
      return JSON.stringify(fakeStorage[key]);
    });
    setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key, value) =>  {
      fakeStorage[key] = JSON.parse(value);
    });

  });

  it('�C���X�^���X����', inject([BookCacheService], (service: BookCacheService) => {
    expect(service).toBeTruthy();
  }));

  it('add ��������ꍇ', inject([BookCacheService], (service: BookCacheService) => {
    fakeStorage = {'bookchain-Angular-book': {} };

    expect(service.add(testData)).toEqual(true);
    expect(service.cachedBook['9784062639149']).toEqual(testData);
  }));

  describe('�X�g���[�W����', () => {
    beforeEach(() => {
      fakeStorage = {
        'bookchain-Angular-book': {
          '9784062639149': {
            id: 'm2BpPQAACAAJ',
            isbn10: '4062639149',
            isbn13: '9784062639149',
            title: '�V��̖I',
            authors: ['����\��'],
            publishedDate: '1998',
            thumbnailURL: 'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
          }
        }
      };
    });

    it('add ���s����ꍇ', inject([BookCacheService], (service: BookCacheService) => {
      expect(service.add(testData)).toEqual(false);
      expect(service.cachedBook['9784062639149']).toEqual(testData);
    }));

  });

});
