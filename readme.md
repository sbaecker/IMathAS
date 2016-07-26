PDO Conversion progress
Total todo: ~2700.  Done: ~930

Most queries have been semi-automatically converted, and should be fine.  The
original queries are still in the code, prefixed by `//DB`.

The big things to look for:
- is $DBH declared as global if the calls are inside a function?
- if the variable is a complex array reference, like $A[$B[1]], the autoconversion
  might not have worked.
- if a query is done in a loop, ideally it only will be "prepared" once
- variables should not have "addslashes" applied before insert - that's handled automatically.
- nor should stripslashes be necessary. The auto-escaping of request variables in config.php will be removed.

Here is a list of files that have been worked on.  Files prefixed with "C" have been converted.
Files prefixed with "0" did not contain any queries, and can be skipped over.

Once a file has been reviewed, please change the C to R.

TODO: Look for branched query declaration, like
````
$query = "SELECT id FROM table WHERE A=:A"
if ($cond==true) {
  $query .= " AND B=:B"
}
$stm = $DBH->prepare($query);
$stm->execute(array(":A"=>$A, ":B"=>$B));
````
Apparently including more variables in the execute than are used in the query will
cause an error.  I'm pretty sure I did that a few times, and those will need to
be fixed.

````
/                   done
C actions         39
C bltilaunch      117
C calcqtimes      10
0 canvas          0
0 canvasnav       0
0 checkbrowser    0
  config.dist     recheck
C dbsetup         63   check against config and install when Done
C DEembedq        3
C directaccess    8
C embedq          1
C footer          1
C forms           12
C gethomemenu     2
C getpostlist     6
  getxml            no longer relevant- should be removed
  google-postreader no longer relevant- should be removed
0 header          0
0 help            0
C index           12
0 infoheader.dist
C install         1   check
C installexamples 3
0 loginpage.dist
C ltihome         30
0 ltisessionsetup
0 multiembedq
C newinstructor.dist  4
C OEAembedq       3
C showlinkedtextpublic  5
C upgrade         237  lots of logic to check
C validate        26

/assessment
 0 asidutil
 C catscores      4

 /libs
  0 all

/course

/diag              done
  C index          18

/filter           done
 0 filter
 /basiclti
  C post          3
  0 blti_util
 /graph
  0 all
 /math
  0 all
 /simplelti
  0 all  

/forums

/includes             done
 C calendardisp     11
 C copyiteminc      63  complex logic changes
 0 DEutil
 0 diff
 C filehandler      4   several hand-santized weird queries
 0 htmlawed
 0 htmlutil
 0 JSON
 C JWT              1
 C ltiauthstore     5
 C ltioutcomes      5
 0 OAuth
 0 parsedatetime
 0 password
 0 rubric
 0 S3
 C stugroups        18
 0 tar.class  
 C unenroll         30  many hand-santized for simplicity
 C updateassess     4
 0 userpics   

/mathchat             should probably remove - obsolete

/msgs                 done   need to check userid on a lot of mark unread/read/etc actions
 C allstumsgslist     6
 C msghistory         5
 C msglist            32  lots of redundant code in here
 C newmsglist         6
 C savetagged         1
 C sentlist           10
 C viewmsg            10

/util                 done
 C blocksearch        1
 C getqcnt            7
 C getstucnt          8   all using safe values
 C getstucntdet       2
 C itemsearch         1
 C listdeprecated     1
 C listextref         1
 C listwronglibs      1
 C makeconditional    4
 C mergescores        6
 C mergestus          4
 C mergeteachers      18
 C replacevids        6
 C rescoreassess      4
 C updatedeprecated   3
 C updateextref       3
 C updatewronglibs    1
 C utils              9

/wikis                done
 C editwiki           8
 C viewwiki           16
 C viewwikipublic     4
 C wikirev            2
````